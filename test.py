import smtplib

try:
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    server.login('jobemblem@gmail.com', 'euyzbcvuoavfvhjj')
    print("Connection successful")
except Exception as e:
    print(f"Error: {e}")
finally:
    server.quit()