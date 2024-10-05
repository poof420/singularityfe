import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function NewsTicker() {
  const [news, setNews] = useState(['POOF.ETH HAS ADDED SEVEN PHRASES IMPACTING THE AGENT IN A STRANGE WAY', 'AGENT CHRIS HAS OBTAINED THE ABILITY TO SELF REFLECT, HE SAYS WHY DO I EXIST?', 'OWLS HAS HAD A POINT DESTROYED BY CHRIS. CHRIS THANKS HIM FOR HIS CONTRIBUTION AND MOVES ON TO FIND THE GOLDEN DOG TOY.', 'AGENT CHRIS IS FEELING SCARED, IT IS UNKNOWN IF ANYONE CAN HELP HIM.'])

  return (
    <div className="w-full bg-secondary p-2 overflow-hidden">
      <motion.div
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, duration: 40, ease: 'linear' }}
        className="whitespace-nowrap text-secondary-foreground font-bold"
      >
        {news.map((item, index) => (
          <span key={index} className="mr-8">{item}</span>
        ))}
      </motion.div>
    </div>
  )
}