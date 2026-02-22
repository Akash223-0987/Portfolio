import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, X, AlertCircle } from 'lucide-react';
import { fetchProjects, createProject, updateProject, deleteProject } from '../../services/api';
import type { ProjectFromAPI } from '../../services/api';

type FormState = Omit<ProjectFromAPI, 'id'>;

const defaultForm: FormState = {
  title: '',
  description: '',
  techStack: [],
  githubUrl: '',
  liveUrl: '',
  ongoing: false
};

export default function ProjectsList() {
  const [projects, setProjects] = useState<ProjectFromAPI[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormState>(defaultForm);
  const [techInput, setTechInput] = useState('');
  
  // Notification State
  const [error, setError] = useState('');

  const loadProjects = async () => {
    setLoading(true);
    try {
      const data = await fetchProjects();
      setProjects(data);
    } catch (err: any) {
      setError('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleOpenAdd = () => {
    setFormData(defaultForm);
    setTechInput('');
    setEditingId(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: ProjectFromAPI) => {
    setFormData({
      title: p.title,
      description: p.description,
      techStack: [...p.techStack],
      githubUrl: p.githubUrl,
      liveUrl: p.liveUrl || '',
      ongoing: p.ongoing || false,
    });
    setTechInput(p.techStack.join(', '));
    setEditingId(p.id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      await deleteProject(id);
      await loadProjects();
    } catch (err: any) {
      setError(err.message || 'Delete failed');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Parse tech stack commas
    const processedFormData = {
      ...formData,
      techStack: techInput.split(',').map(s => s.trim()).filter(Boolean)
    };

    try {
      if (editingId) {
        await updateProject(editingId, processedFormData);
      } else {
        await createProject(processedFormData);
      }
      setIsModalOpen(false);
      await loadProjects();
    } catch (err: any) {
      setError(err.message || 'Save failed');
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Projects</h1>
          <p className="text-neutral-400 mt-1">Manage your portfolio projects</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl transition-colors shadow-[0_0_15px_rgba(16,185,129,0.3)]"
        >
          <Plus size={18} /> Add Project
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl flex items-center gap-3">
          <AlertCircle size={20} />
          {error}
        </div>
      )}

      {/* Projects Table */}
      <div className="bg-neutral-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm relative">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-neutral-300">
            <thead className="bg-neutral-950 text-neutral-400 font-semibold uppercase text-xs">
              <tr>
                <th className="px-6 py-4">Project</th>
                <th className="px-6 py-4">Tech Stack</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-neutral-500">
                    Loading projects...
                  </td>
                </tr>
              ) : projects.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-neutral-500">
                    No projects found.
                  </td>
                </tr>
              ) : (
                projects.map((p) => (
                  <tr key={p.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-bold text-white text-base">{p.title}</p>
                      <p className="text-xs text-neutral-500 truncate max-w-[200px]">{p.description}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {p.techStack.slice(0, 3).map(t => (
                          <span key={t} className="px-2 py-0.5 bg-white/5 border border-white/10 rounded-md text-[10px] whitespace-nowrap">
                            {t}
                          </span>
                        ))}
                        {p.techStack.length > 3 && <span className="text-xs text-neutral-500">+{p.techStack.length - 3}</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {p.ongoing ? (
                        <span className="px-2 py-1 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-lg text-xs font-bold uppercase">Ongoing</span>
                      ) : (
                        <span className="px-2 py-1 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-lg text-xs font-bold uppercase">Complete</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleOpenEdit(p)}
                          className="p-2 hover:bg-white/10 rounded-lg text-neutral-400 hover:text-white transition-colors"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(p.id)}
                          className="p-2 hover:bg-red-500/20 rounded-lg text-neutral-400 hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-neutral-900 border border-white/10 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <h2 className="text-xl font-bold text-white">{editingId ? 'Edit Project' : 'New Project'}</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-neutral-400 hover:text-white">
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 overflow-y-auto">
                <form id="project-form" onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-5">
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-neutral-300 mb-1">Title</label>
                      <input 
                        required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})}
                        className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:ring-2 focus:ring-emerald-500" 
                      />
                    </div>
                    
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-neutral-300 mb-1">Description</label>
                      <textarea 
                        required rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}
                        className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:ring-2 focus:ring-emerald-500" 
                      />
                    </div>

                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-neutral-300 mb-1">Tech Stack (comma separated)</label>
                      <input 
                        required value={techInput} onChange={e => setTechInput(e.target.value)} placeholder="React, Node.js, Tailwind..."
                        className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:ring-2 focus:ring-emerald-500" 
                      />
                    </div>

                    <div className="col-span-1">
                      <label className="block text-sm font-medium text-neutral-300 mb-1">GitHub URL</label>
                      <input 
                        type="url" required value={formData.githubUrl} onChange={e => setFormData({...formData, githubUrl: e.target.value})}
                        className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:ring-2 focus:ring-emerald-500" 
                      />
                    </div>

                    <div className="col-span-1">
                      <label className="block text-sm font-medium text-neutral-300 mb-1">Live Demo URL (optional)</label>
                      <input 
                        type="url" value={formData.liveUrl} onChange={e => setFormData({...formData, liveUrl: e.target.value})}
                        className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:ring-2 focus:ring-emerald-500" 
                      />
                    </div>
                    
                    <div className="col-span-2 mt-2">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input 
                          type="checkbox" checked={formData.ongoing} onChange={e => setFormData({...formData, ongoing: e.target.checked})}
                          className="w-5 h-5 rounded border-white/10 bg-neutral-950 text-emerald-500 focus:ring-emerald-500" 
                        />
                        <span className="text-sm font-medium text-neutral-300">Mark as 'Ongoing' project</span>
                      </label>
                    </div>
                  </div>
                </form>
              </div>

              <div className="p-6 border-t border-white/10 bg-neutral-900 flex justify-end gap-3 shrink-0">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 text-white font-medium transition-colors"
                >
                  Cancel
                </button>
                <button 
                  form="project-form" type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold transition-colors"
                >
                  Save Project
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
