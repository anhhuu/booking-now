import json

import requests
from bs4 import BeautifulSoup


def get_sitemap(url):
    get_url = requests.get(url)

    if get_url.status_code == 200:
        return get_url.text
    else:
        print('Unable to fetch sitemap: %s.' % url)


def process_sitemap(s):
    soup = BeautifulSoup(s)
    result = []

    for loc in soup.findAll('loc'):
        if ("https://pasgo.vn/nha-hang/" in loc.text):
            result.append(loc.text)

    return result


def is_sub_sitemap(s):
    if s.endswith('.xml') and 'sitemap' in s:
        return True
    else:
        return False


def parse_sitemap(s):
    sitemap = process_sitemap(s)
    result = []

    while sitemap:
        candidate = sitemap.pop()

        if is_sub_sitemap(candidate):
            sub_sitemap = get_sitemap(candidate)
            for i in process_sitemap(sub_sitemap):
                sitemap.append(i)
        else:
            result.append(candidate)

    return result


def getHoChiMinh():
    urls = []
    i = 1
    while i < 10:
        url = "https://pasgo.vn/ho-chi-minh/an-uong?page=" + str(i)
        html_text = requests.get(url).text
        soup = BeautifulSoup(html_text, "html.parser")
        for j in soup.find_all('a', attrs={'class':'waptop'}):
            urls.append(j['href'])
        i += 1
    return urls


def main():
    urls = getHoChiMinh()
    myData= {}
    myData['Store'] = []
    m=0;
    for url in urls:
        html_text = requests.get(url).text
        soup = BeautifulSoup(html_text, "html.parser")
        image_full = []
        if soup.find('span', attrs={'class':'pasgo-title'}):
            name = soup.find('span', attrs={'class':'pasgo-title'}).text
        else:
            continue
        if soup.find('div', attrs={'class':'carousel-inner'}):
            for i in soup.find('div', attrs={'class': 'carousel-inner'}).find_all(attrs={'class':'img-responsive'}):
                if "https://pasgo.vn/Assets/Images" in i['src']:
                    image_full.append(i['data-src'])
                else:
                    image_full.append(i['src'])
        else:
            continue
        menu_full =[]

        if soup.find('div', attrs={'id': 'carousel-price'}):
            for i in soup.find('div', attrs={'id': 'carousel-price'}).find_all('img'):
                menu_full.append(i['src'])

        if soup.find('meta', attrs={'itemprop': 'ratingValue'}):
            rating = soup.find('meta', attrs={'itemprop': 'ratingValue'})['content']
        else:
            continue
        if soup.find('span', attrs={'itemprop': 'streetAddress'}):
            address = soup.find('span', attrs={'itemprop': 'streetAddress'}).text +", TP.HCM"
        else:
            continue
        if soup.find('p', attrs={'class': 'hours-pickup'}):
            openingHours = soup.find('p', attrs={'class': 'hours-pickup'}).text
        else:
            continue
        if soup.find('span', attrs={'itemprop': 'priceRange'}):
            priceRange = soup.find('span', attrs={'itemprop': 'priceRange'}).text
        else:
            continue

        title = []
        description = []

        if soup.find('article', attrs={'id': 'gioi-thieu'}).find('div', attrs={'class': 'col-xs-app-7'}):
            for i in soup.find('article', attrs={'id': 'gioi-thieu'}).find('div', attrs={'class': 'col-xs-app-7'}).find_all('div', attrs={'class': 'txt-title'}):
                if i.text:
                    title.append(i.text)
            for i in soup.find('article', attrs={'id': 'gioi-thieu'}).find('div', attrs={'class': 'col-xs-app-7'}).find_all('div', attrs={'class': 'text-description'}):
                if i.text:
                    description.append(i.text)

        content_gioithieu = []
        for i in soup.find('article', attrs={'id': 'gioi-thieu'}).find_all('p'):
            if i.text != "" and i.text not in description:
                content_gioithieu.append(i.text)
        title_gioithieu =[]
        if soup.find('article', attrs={'id':'gioi-thieu'}).find('h3'):
            title_gioithieu.append(soup.find('article', attrs={'id':'gioi-thieu'}).find('h3').text)

        myGioithieu =[]
        try:
            for i in range(0, len(title)):
                myGioithieu.append(
                    {
                        'title': title[i],
                        'description': description[i]
                    })
            myGioithieu.append(
                {
                    'title': title_gioithieu[0],
                    'description': content_gioithieu
                }
            )
        except IndexError:
            pass

        captionImg = []
        if soup.find('div', attrs={'id': 'gioithieu-more'}):
            for i in soup.find('div', attrs={'id': 'gioithieu-more'}).find_all('h5'):
                if i.text:
                    captionImg.append(i.text)
        google_call = soup.find('article', attrs={'id':'dia-chi'}).find('a')['href']
        google_image = soup.find('article', attrs={'id':'dia-chi'}).find('img')['data-src']
        print(m)
        m+=1
        url = url.split('/')[len(url.split('/'))-1]
        myData['Store'].append({
            'url': url,
            'name': name,
            'rating': rating,
            'address': address,
            'openingHours': openingHours,
            'priceRange': priceRange,
            'introduction_content': myGioithieu,
            'address_img':{
                'map_url': google_call,
                'img': google_image
            },
            'imgs_url': image_full,
            'caption-img': captionImg,
            'menu_url': menu_full,
        })
    with open('PasgoHCM.json', 'w') as outfile:
        json.dump(myData, outfile)


if __name__ == '__main__':
    main()