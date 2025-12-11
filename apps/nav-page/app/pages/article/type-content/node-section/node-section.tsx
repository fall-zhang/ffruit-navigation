import type { SectionType } from '../../types'
import NodeSentence from '../node-sentence/node-sentence.vue'

export const NodeSection = defineComponent({
  components: {
    NodeSentence
  },
  setup () {
    const props = defineProps<{
      section:SectionType
    }>()

    return <p class={'my-1.5'}>
      {props.section.sentences.map(sentence => {
        return <NodeSentence {...sentence} />
      })}
    </p>
  }
})
