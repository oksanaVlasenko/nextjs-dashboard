import Section from "@/app/ui/components/section-component";
import LearningItem from "@/app/ui/learning/menu-item";

const links = [
  { 
    name: 'Flip Cards', 
    description: 'It helps you quickly memorize words and phrases. You see a word or phrase on one side of the card, and the answer appears when you click.', 
    href: 'learning/flip-cards'
  },
  { 
    name: 'Choose Translation', 
    description: 'It helps test your knowledge by choosing the correct translation of a word. You’ll see a word in one language and need to select its correct translation from multiple options.', 
    href: 'learning/choose-translation'
  },
  { 
    name: 'Fill Gaps', 
    description: 'It helps reinforce your memory by filling in missing words or phrases. You see a sentence with blanks, and you need to complete it by choosing the correct word.', 
    href: 'learning/fill-gaps'
  },
  { 
    name: 'Read and Learn', 
    description: 'It generates text for reading, followed by tasks to test your understanding. You read the passage and then complete related exercises to reinforce your learning.', 
    href: 'learning/read-and-learn'
  },
  { 
    name: 'Puzzle Word', 
    description: 'It  helps you form words by arranging letters. Rearrange the given letters to create valid words and challenge your vocabulary skills.', 
    href: 'learning/puzzle-word'
  },
]

export default function LearningNav() {
  return (
    <Section>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 place-items-center">
        {
          links.map((link) => (
            <LearningItem 
              key={link.href}
              name={link.name}
              description={link.description}
              link={link.href}
            />
          ))
        }
      </div>
    </Section>
  )
}