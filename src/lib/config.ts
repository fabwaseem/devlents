import { Icons } from "@/components/Icons";

export const navLinks = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "About",
    url: "/about",
  },
  {
    name: "Components",
    url: "/components",
    submenu: [
      {
        name: "HTML/CSS",
        url: "/components/html-css",
      },
      {
        name: "Tailwind CSS",
        url: "/components/tailwind",
      },
      {
        name: "Bootstrap",
        url: "/components/bootstrap",
      },
      {
        name: "React Components",
        url: "/components/react",
      },
    ],
  },
];

export const footerLinks = {
  Explore: [
    {
      name: "Home",
      url: "/",
    },
    {
      name: "About",
      url: "/about",
    },
    {
      name: "Components",
      url: "/components",
    },
  ],
  Components: [
    {
      name: "HTML/CSS",
      url: "/components/html-css",
    },
    {
      name: "Tailwind CSS",
      url: "/components/tailwind",
    },
    {
      name: "Bootstrap",
      url: "/components/bootstrap",
    },
    {
      name: "React Components",
      url: "/components/react",
    },
  ],
};

export const contactDetails = {
  email: "support@devlents.com",
  phone: "+123 456 789",
};

export const socialLinks = [
  {
    name: "Facebook",
    url: "https://www.facebook.com/",
    icon: Icons.facebook,
  },
  {
    name: "Twitter",
    url: "https://twitter.com/",
    icon: Icons.twitter,
  },
  {
    name: "Linkedin",
    url: "https://www.linkedin.com/",
    icon: Icons.linkedin,
  },
];
