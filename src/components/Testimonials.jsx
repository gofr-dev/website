import vineetImage from '@/images/vineet_pp.jpg'
import praveenImage from '@/images/praveen_kumar.jpg'
import Carousel from "@/components/Carousel";

const testimonialsData = [
  {
    name: 'Praveen Kumar',
    role: 'Founder of apnerve labs',
    profile: praveenImage,
    content:
      'What I like about GoFr is that it plays well with the standard CI/CD infrastructure, deployment environment, and every additional tool in between. Also, it solves for the 80% cases, thus, ensuring we only focus on our core business',
  },
  {
    name: 'Vineet Dwivedi',
    role: 'Founder & CEO at LaunchX',
    profile: vineetImage,
    content:
      "The strong opinions embedded in GoFr.dev make it incredibly efficient and straightforward to work with. It's like having a trusted expert guiding your every move. The framework's Golang foundation ensures exceptional performance and reliability. If you're serious about microservices, this is a must-try",
  },
]

export function Testimonials() {
  return (
    <>
      <Carousel data={testimonialsData} />
    </>
  )
}
