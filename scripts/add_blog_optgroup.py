import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('admin/index.html', 'r', encoding='utf-8') as f:
    admin_content = f.read()

blog_optgroup = """          <optgroup label="Blog Articles (All 5 Articles)">
            <option value="siteContent/blog-ella-tea|blog/ella-hands-on-tea-making-experience/index.html">Ella: Hands-On Tea Making Experience with Tasting</option>
            <option value="siteContent/blog-sacred-kingdoms|blog/sacred-footsteps-unlocking-sri-lankas-ancient-buddhist-kingdoms/index.html">Sacred Footsteps: Ancient Kingdoms</option>
            <option value="siteContent/blog-elephant-gathering|blog/the-great-gathering-watching-hundreds-of-wild-elephants-at-minneriya/index.html"> The Great Gathering: Minneriya Elephants</option>
            <option value="siteContent/blog-sinharaja-reforestation|blog/growing-a-greener-future-volunteer-reforestation-sinharaja/index.html">Sinharaja Volunteer Reforestation</option>
            <option value="siteContent/blog-ayurveda-healing|blog/living-healing-traditional-ceylon-ayurveda/index.html">Living Healing: Traditional Ayurveda</option>
          </optgroup>
"""

target = '<optgroup label="Legal & Policies">'
if 'optgroup label="Blog Articles' not in admin_content:
    admin_content = admin_content.replace(target, blog_optgroup + '          ' + target)
    with open('admin/index.html', 'w', encoding='utf-8') as f:
        f.write(admin_content)
    print("Added Blog Articles optgroup to admin/index.html!")
else:
    print("Already in admin/index.html")
