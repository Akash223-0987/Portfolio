import asyncio
from app.database import database

async def main():
    resume = await database["resume"].find_one()
    print(resume)

if __name__ == "__main__":
    asyncio.run(main())
