import Image from './action'
import Action from './action'

interface Buckets{
    title_h3: string;
    description: string;
    icon: Image;
}

interface Article {
    href: string;
    title: string;
  }
  
interface Blogs {
    featured_image: Image;
    url: string;
  }

interface Card {
    title_h3: string;
    description: string;
    call_to_action: Action;
  }

interface Employee {
    name: string;
    image: Image;
    designation: string;
  }

export default interface Data{
    title_h2: string;
    bucket: Buckets;
    banner_title: string;
    banner_description: string;
    view_articles: Article;
    featured_blogs: Blogs;
    call_to_action: Action;
    banner_image: Image;
    description: string;
    image: Image;
    buckets: Buckets;
    cards: Card;
    html_code_alignment: string;
    html_code: string;
    employees: Employee
}

export default interface Links {
    title: string;
    label: string;
  }