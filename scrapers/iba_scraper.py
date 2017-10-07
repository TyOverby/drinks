import urllib2
import sys
import json
from bs4 import BeautifulSoup

def parseList():
    page = urllib2.urlopen("https://en.m.wikipedia.org/wiki/List_of_IBA_official_cocktails")
    source = page.read()
    soup = BeautifulSoup(source, 'html.parser')
    main_content = soup.find(**{"id": "content"})
    lists = main_content.find_all("ul")

    recipies = []

    for lst in lists[1:4]:
        items  = lst.find_all("li")
        for item in items:
            link = item.find("a")
            name = link.text
            url = link['href']
            builder = {u'name': name}
            try:
                parseIndividual(url, builder)
                recipies.append(builder)
            except:
                sys.stderr.write("failed for " + name)
    print json.dumps(recipies, indent=4)

def parseIndividual(url, builder):
    target = "https://en.m.wikipedia.org" + url
    page = urllib2.urlopen(target)
    source = page.read()
    soup = BeautifulSoup(source, 'html.parser')
    infobox = soup.find(**{"class": "infobox"})
    inforows = infobox.find_all("tr")

    for row in inforows:
        key = row.find("th")
        value = row.find("td")
        if key is None or value is None: continue

        valueList = value.find_all("li")
        value = value.text.strip()
        if len(valueList) != 0:
            valueListText = map(lambda li: li.text.strip()., valueList)
            value = valueListText
        builder[name_to_key(key.text)] = value

def name_to_key(name):
    parts = name.strip().split()
    lowered = map(lambda p: p.lower(), parts)
    return "_".join(lowered)

parseList()
