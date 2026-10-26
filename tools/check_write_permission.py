import urllib.request, json

url = 'https://firestore.googleapis.com/v1/projects/louterst-36b64/databases/(default)/documents/settings/test_ping'
body = json.dumps({'fields': {'ping': {'stringValue': 'pong'}}}).encode('utf-8')

req = urllib.request.Request(url, data=body, headers={'Content-Type': 'application/json'}, method='PATCH')

try:
    with urllib.request.urlopen(req) as resp:
        print('WRITE_SUCCESS: HTTP', resp.getcode())
        # Delete test doc
        del_req = urllib.request.Request(url, method='DELETE')
        try:
            urllib.request.urlopen(del_req)
        except:
            pass
except urllib.error.HTTPError as e:
    print('WRITE_BLOCKED: HTTP', e.code)
    try:
        err = json.loads(e.read().decode('utf-8'))
        print('Message:', err.get('error', {}).get('message'))
    except:
        pass
except Exception as e:
    print('Error:', e)
