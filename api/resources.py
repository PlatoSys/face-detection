from import_export.resources import ModelResource
from import_export.fields import Field
from .models import Face


class FaceResource(ModelResource):
    user = Field(
        column_name='user',
        attribute='user__email',
    )
    class Meta:
        model = Face
        exclude = ('id', 'created_at')
