from import_export.resources import ModelResource
from import_export.fields import Field
from .models import DetectionImage


class DetectionImageResource(ModelResource):
    user = Field(
        column_name='user',
        attribute='user__email',
    )

    class Meta:
        model = DetectionImage
        exclude = ('id', 'created_at')
