from django.contrib import admin
from .models import Watch , WatchFile , Profile, LogEntry

# Register your models here.
admin.site.register(Watch)
admin.site.register(WatchFile)
admin.site.register(Profile)
admin.site.register(LogEntry)
