"""etf_online_competition_system URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.conf.urls.static import static
from django.contrib import admin
from django.contrib.staticfiles.views import serve
from django.views.generic import TemplateView, RedirectView
from rest_framework_jwt.views import obtain_jwt_token
from api.admin import admin_site

from api import urls
from . import settings

urlpatterns = [

    # url(r'^admin/', admin.site.urls),
    url(r'^$', serve, kwargs={'path': 'index.html'}),
    url(r'^(?!/?static/)(?!/?media/)(?P<path>.*\..*)$', RedirectView.as_view(url='/static/%(path)s', permanent=False)),
    url(r'^admin/', admin_site.urls),
    url(r'^nested_admin/', include('nested_admin.urls')),
    url(r'^api-token-auth/', obtain_jwt_token),
    url(r'^api/', include(urls)),
    url(r'.*', RedirectView.as_view(url='/', permanent=True))
]

urlpatterns += static(r'^static', document_root=settings.ANGULAR_APP_DIR)
