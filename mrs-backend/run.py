# # from datetime import datetime

# # # your fixed datetime
# # target = datetime.fromisoformat("2026-06-28 20:17:49.961435")

# # # current datetime
# # now = datetime.now()

# # # difference
# # diff = target - now

# # print("Target:", target)
# # print("Now:", now)
# # print("Difference:", diff)

# # print(round(abs(diff.total_seconds() / 3600)))

# from pwdlib import PasswordHash
# import jwt
# from datetime import datetime, timedelta, timezone

# SECRET='7b90ba7483dcbd0d1c7328ad31f8a77de9f6425392948eba617b9102905bcd15'
# ALGORITHM="HS256"
# # password_hash = PasswordHash.recommended()

# # passw = "Biko.123"

# # hashed_passw = password_hash.hash(passw)

# # print(hashed_passw)
# # print(password_hash.verify(passw, hashed_passw))


# encoded_token = jwt.encode({"email": "stevepetes26@gmail.com", "exp": datetime.now(timezone.utc) + timedelta(seconds=5)}, SECRET, algorithm=ALGORITHM)
# decoded_token = jwt.decode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN0ZXZlcGV0ZXMyNkBnbWFpbC5jb20ifQ.HK5aIRc1lSUgsSR-NI6GGO4gsbkvRZii8VvBuHOz-B4", SECRET, algorithms=ALGORITHM)

# print({
#     "encoded": encoded_token,
#     "decoded": decoded_token
# })

# print(decoded_token.get("email"))

from email_validator import validate_email, EmailNotValidError

try:
    emailinfo = validate_email("stevepetes26@gmail.com")
    email = emailinfo.normalized
    print(emailinfo, "\n")
    print(email)
except EmailNotValidError as e:
    print(str(e))