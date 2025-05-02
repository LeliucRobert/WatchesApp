from api.models import LogEntry

def create_log(user, action, model_name, object_id=None):
    LogEntry.objects.create(
        user=user,
        action=action,
        model_name=model_name,
        object_id=object_id
    )
