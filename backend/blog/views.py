from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework import status
from .models import Blog
from .serializers import BlogSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import viewsets
from rest_framework.pagination import PageNumberPagination
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST
from .models import Blog
from .serializers import BlogSerializer


# Register User
class RegisterView(APIView):
    def post(self, request):
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')

        if User.objects.filter(username=username).exists():
            return Response({'error': 'Username already exists'}, status=400)

        user = User.objects.create_user(username=username, email=email, password=password)
        return Response({'message': 'User created successfully'})

# Login View (Returns JWT Tokens)
class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)

        if user:
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            return Response({'token': access_token}, status=status.HTTP_200_OK)

        return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

# List All Blogs (Public)
class BlogListView(APIView):
    def get(self, request):
        blogs = Blog.objects.all()
        paginator = CustomPagination()
        paginated_blogs = paginator.paginate_queryset(blogs, request)
        serializer = BlogSerializer(paginated_blogs, many=True)
        return paginator.get_paginated_response(serializer.data) # Add pagination later if needed

# Blog Detail View
class BlogDetailView(generics.RetrieveAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer

# Create Blog (Only Authenticated Users)
class BlogCreateView(generics.CreateAPIView):
    serializer_class = BlogSerializer
    permission_classes = [permissions.IsAuthenticated]  # Ensure only authenticated users can create blogs

    def post(self, request, *args, **kwargs):
        # Assign the logged-in user as the author
        data = request.data.copy()  # Copy the request data
        data["author"] = request.user.id  # Assign user ID to author field

        serializer = self.get_serializer(data=data)
        if serializer.is_valid():
            serializer.save(author=request.user)  # Save with authenticated user as author
            return Response(serializer.data, status=HTTP_201_CREATED)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

# Update Blog (Only Author Can Edit)

class BlogUpdateView(APIView):
    permission_classes = [IsAuthenticated]  # Ensure the user is authenticated

    def put(self, request, pk):
        try:
            blog = Blog.objects.get(pk=pk)
        except Blog.DoesNotExist:
            return Response({'error': 'Blog not found'}, status=status.HTTP_404_NOT_FOUND)

        if blog.author != request.user:
            return Response({'error': 'You are not authorized to edit this blog'}, status=status.HTTP_403_FORBIDDEN)

        # Use partial=True to allow partial updates
        serializer = BlogSerializer(blog, data=request.data, partial=True)
        if serializer.is_valid():
            try:
                serializer.save()  # Save the blog
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({'error': 'Internal server error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

# Delete Blog (Only Author Can Delete)
class DeleteBlogView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk, format=None):
        try:
            blog = Blog.objects.get(id=pk, author=request.user)  # Ensure the user owns the blog
            blog.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Blog.DoesNotExist:
            return Response(
                {'detail': 'Blog not found or you are not authorized to delete this blog.'},
                status=status.HTTP_404_NOT_FOUND
            )


class CustomPagination(PageNumberPagination):
    page_size = 6
    page_size_query_param = 'page_size'  
    max_page_size = 100

class CreateBlogView(generics.CreateAPIView):
    serializer_class = BlogSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        data = request.data.copy()
        data["author"] = request.user.id  # Assign logged-in user as the author

        serializer = self.get_serializer(data=data)
        if serializer.is_valid():
            serializer.save(author=request.user)
            return Response(serializer.data, status=HTTP_201_CREATED)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)