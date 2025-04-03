from rest_framework import serializers
from drf_extra_fields.fields import Base64FileField
from .models import Watch, WatchFile

class WatchFileSerializer(serializers.ModelSerializer):
    file = serializers.SerializerMethodField()
    class Meta:
        model = WatchFile
        fields = ['id', 'file' , 'file_type']

    def get_file(self, obj):
        request = self.context.get('request')
        return request.build_absolute_uri(obj.file.url)

class WatchSerializer(serializers.ModelSerializer):
    media = WatchFileSerializer(many=True, read_only=True)  # ✅ read_only=True

    category = serializers.ChoiceField(choices=Watch.CATEGORY_CHOICES)
    condition = serializers.ChoiceField(choices=Watch.CONDITION_CHOICES)

    class Meta:
        model = Watch
        fields = ['id', 'name', 'description', 'price', 'category', 'condition', 'media' , 'seller', 'created_at']
        read_only_fields = ['created_at']

    # def validate_price(self, value):
    #     if value <= 0:
    #         raise serializers.ValidationError("Price must be greater than 0.")
    #     return value

    # def create(self, validated_data):
    #     media_files = validated_data.pop('media', [])
    #     watch = Watch.objects.create(**validated_data)

    #     for media in media_files:
    #         WatchFile.objects.create(
    #             watch=watch,
    #             file=media['file'],
    #             file_type=media['file_type']
    #         )

    #     return watch