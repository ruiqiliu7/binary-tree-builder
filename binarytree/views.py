from rest_framework import viewsets
from .models import TreeNode
from .serializers import TreeNodeSerializer

class TreeNodeViewSet(viewsets.ModelViewSet):
    queryset = TreeNode.objects.all()
    serializer_class = TreeNodeSerializer
