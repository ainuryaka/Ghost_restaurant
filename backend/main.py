from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import routers

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origin_regex="https?://.*",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


for router in routers.__all__:
    app.include_router(getattr(routers, router))
