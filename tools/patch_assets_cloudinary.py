with open('assets/js/config.js', 'r', encoding='utf-8') as f:
    c = f.read().replace('\r\n', '\n')

old_inq = """    // API Endpoint for Inquiries (Formspree fallback)
    inquiryEndpoint: "https://formspree.io/f/mqkvnzyz"
  };"""

new_inq = """    // API Endpoint for Inquiries (Formspree fallback)
    inquiryEndpoint: "https://formspree.io/f/mqkvnzyz",

    // Cloudinary Client Configuration (Public CDN & Unsigned Upload)
    cloudinary: {
      cloudName: "qmukrbh6",
      uploadPreset: "lotus_tours_unsigned",
      folder: "lotus/tours"
    }
  };"""

if old_inq in c:
    c = c.replace(old_inq, new_inq)
    with open('assets/js/config.js', 'w', encoding='utf-8', newline='\n') as f:
        f.write(c)
    print("SUCCESS: Added cloudinary to assets/js/config.js")
else:
    print("FAILED: old_inq not found")
