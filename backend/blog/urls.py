from django.urls import path
from .views import BlogListView, BlogDetailView, CreateBlogView, BlogUpdateView, DeleteBlogView, RegisterView, LoginView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('blogs/', BlogListView.as_view(), name='blog_list'),
    path('blogs/<int:pk>/', BlogDetailView.as_view(), name='blog_detail'),
    path('blogs/create/', CreateBlogView.as_view(), name='create_blog'),  # Adjusted path
    path('blogs/<int:pk>/edit/', BlogUpdateView.as_view(), name='blog-update'),  # Adjusted path
    path('blogs/<int:pk>/delete/', DeleteBlogView.as_view(), name='delete_blog'),  # Adjusted path
]
