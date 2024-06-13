from rest_framework import serializers
from .models import TreeNode

class TreeNodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = TreeNode
        fields = '__all__'
