from bs4 import BeautifulSoup

with open("inquiry-quick.html", "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f.read(), "html.parser")

inputs = soup.find_all(["input", "select", "textarea"])
for idx, inp in enumerate(inputs):
    inp_type = inp.get("type", "").lower()
    if inp_type in ["hidden", "submit", "button", "reset"]:
        continue
    inp_id = inp.get("id")
    has_label = False
    if inp_id and soup.find("label", attrs={"for": inp_id}):
        has_label = True
    elif inp.find_parent("label"):
        has_label = True
    elif inp.get("aria-label") or inp.get("aria-labelledby") or inp.get("title"):
        has_label = True
    if not has_label:
        print(f"Unlabeled #{idx}: tag={inp.name} id='{inp_id}' name='{inp.get('name')}' placeholder='{inp.get('placeholder')}' parent={inp.parent.name}")
