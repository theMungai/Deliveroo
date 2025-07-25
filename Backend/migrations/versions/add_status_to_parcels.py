"""
add status to parcels

Revision ID: add_status_to_parcels
Revises: add_recipient_name_to_parcels
Create Date: 2025-07-24 15:30:00.000000
"""
from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = 'add_status_to_parcels'
down_revision: Union[str, None] = 'add_recipient_name_to_parcels'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

def upgrade():
    # 1. Add the column as nullable with a default
    op.add_column('parcels', sa.Column('status', sa.String(), nullable=True, server_default='Pending'))
    # 2. Fill existing rows with the default value
    op.execute("UPDATE parcels SET status='Pending' WHERE status IS NULL")
    # 3. Alter the column to NOT NULL
    op.alter_column('parcels', 'status', nullable=False)
    # 4. Remove the default if you don’t want it enforced on future inserts
    op.alter_column('parcels', 'status', server_default=None)

def downgrade():
    op.drop_column('parcels', 'status')
