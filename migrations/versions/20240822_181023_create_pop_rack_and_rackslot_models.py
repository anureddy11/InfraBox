"""Create Pop, Rack, and RackSlot models

Revision ID: 56c4041b0191
Revises: 701136364b27
Create Date: 2024-08-22 18:10:23.810179

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '56c4041b0191'
down_revision = '701136364b27'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('rack_slots', schema=None) as batch_op:
        batch_op.add_column(sa.Column('server', sa.String(), nullable=False))
        batch_op.drop_column('status')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('rack_slots', schema=None) as batch_op:
        batch_op.add_column(sa.Column('status', sa.VARCHAR(), nullable=False))
        batch_op.drop_column('server')

    # ### end Alembic commands ###
