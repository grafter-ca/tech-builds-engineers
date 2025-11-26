export interface ServiceItem {
  slug: string;
  title: string;
  description: string;
  image?: string;
  details: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  overview: string;
  highlights: string[];
  modules: { title: string; content: string }[];
}

export interface CourseItem {
  slug: string;
  image?: string;
  title: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  desc1: string;
  desc2: string;
  overview: string;
  highlights: string[];
  modules: {
    title: string;
    content: string;
  }[];
}

export interface FooterInformationsType {
  title: string;
  content?: string[];
  links?: { name: string; href: string }[];
  contact?: {
    email: string;
    phone: string;
    location: string;
  };
  socials?: { name: string; url: string; icon: React.ComponentType, }[];
}

export interface Instructor {
  id: number;
  name: string;
  role: string;
  specialization: string;
  experience: string;
  image: string;
  bio: string;
  courses: string[];
}

export interface TeamMember {
  id: number;
  name: string;
  position: string;
  image: string;
  intro: string;
  socials: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}