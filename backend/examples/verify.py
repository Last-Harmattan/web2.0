""" Beispiel Validierung einer RSA Signatur. """


from Crypto.Hash import SHA256
from Crypto.Signature import pkcs1_15
from Crypto.PublicKey import RSA

key = RSA.generate(2048)

message = b'Test'
h = SHA256.new(message)
signature = pkcs1_15.new(key).sign(h)


try:
    pkcs1_15.new(key.publickey()).verify(h, signature)
except (ValueError):
    print('Signatur ungültig')
