import sys
import os
from logging.config import fileConfig

from sqlalchemy import engine_from_config
from sqlalchemy import pool
from alembic import context

from dotenv import load_dotenv
load_dotenv()


# Add app directory to sys.path
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

# Import your models and settings
from app.database.database import Base  # This is where your Base and engine should be
from app.models import user, admin, parcel, weight_category, status_history

# Load Alembic config
config = context.config

# Interpret the config file for Python logging.
fileConfig(config.config_file_name)

# Replace with your actual database URL or import from your settings
from app.database.database import SQLALCHEMY_DATABASE_URL
config.set_main_option("sqlalchemy.url", SQLALCHEMY_DATABASE_URL)

# This is the metadata used by Alembic to detect schema changes
target_metadata = Base.metadata


def run_migrations_offline():
    """Run migrations in 'offline' mode."""
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
        compare_type=True,  # Important for detecting column type changes
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online():
    """Run migrations in 'online' mode."""
    connectable = engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
            compare_type=True,  # Important for detecting column type changes
        )

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
