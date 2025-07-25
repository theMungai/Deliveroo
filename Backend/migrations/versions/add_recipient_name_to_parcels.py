"""
Alembic migration script to add recipient_name column to parcels table
"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = "add_recipient_name_to_parcels"
down_revision = "58bc82106d05"  # Fixed to match the last valid migration
branch_labels = None
depends_on = None

def upgrade():
    op.add_column('parcels', sa.Column('recipient_name', sa.String(), nullable=True))

def downgrade():
    op.drop_column('parcels', 'recipient_name')
