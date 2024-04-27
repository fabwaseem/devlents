import { Icons } from "@/components/Icons";
import { Logos } from "@/components/Logos";

export const componentCategories = [
  {
    label: "Button",
    value: "button",
  },
  {
    label: "Checkbox",
    value: "checkbox",
  },
  {
    label: "Card",
    value: "card",
  },
  {
    label: "Loader",
    value: "loader",
  },
  {
    label: "Input",
    value: "input",
  },
  {
    label: "Form",
    value: "form",
  },
  {
    label: "Pattern",
    value: "pattern",
  },
  {
    label: "Radio Button",
    value: "radio-button",
  },
  {
    label: "Tooltip",
    value: "tooltip",
  },
  {
    label: "Toggle switch",
    value: "toggle-switch",
  },
];

const componentLinks = componentCategories.map((item) => ({
  name: item.label + "s",
  url: `/components?category=${item.value}`,
}));
export const navLinks = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Components",
    url: "/components",
    submenu:componentLinks
  },
  {
    name: "About",
    url: "/about",
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
  Components: componentLinks,
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

export const languagesLogos = [
  {
    name: "HTML5",
    logo: Logos.html,
    url: "components/html-css",
  },
  {
    name: "CSS3",
    logo: Logos.css,
    url: "components/html-css",
  },
  {
    name: "React",
    logo: Logos.react,
    url: "components/react",
  },

  {
    name: "Tailwind CSS",
    logo: Logos.tailwind,
    url: "components/tailwind",
  },
  {
    name: "Bootstrap",
    logo: Logos.bootstrap,
    url: "components/bootstrap",
  },
  {
    name: "Webflow",
    logo: Logos.webflow,
    url: "components/webflow",
  },
  {
    name: "Framer",
    logo: Logos.framer,
    url: "components/framer",
  },
];

export const team = [
  {
    name: "Waseem Anjum",
    position: "Owner/Developer",
    image: "/images/user.jpg",
    socialLinks: [
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
    ],
  },
  {
    name: "Naeem Anjum",
    position: "CEO",
    image: "/images/user.jpg",
    socialLinks: [
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
    ],
  },
  {
    name: "Naveed Anjum",
    position: "Supporter",
    image: "/images/user.jpg",
    socialLinks: [
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
    ],
  },
];
