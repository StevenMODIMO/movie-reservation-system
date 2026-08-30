from datetime import datetime, timedelta, timezone

d = datetime.now()
d1hr = d + timedelta(hours=1)

movie_duration = timedelta(hours=1)

# if d < movie_duration:
#     print(True)
# else:
#     print(False)