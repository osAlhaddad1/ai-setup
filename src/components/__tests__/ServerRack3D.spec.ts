import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import ServerRack3D from '../ServerRack3D.vue'

describe('ServerRack3D', () => {
  it('builds the node from 21 shards with scatter targets', () => {
    const wrapper = mount(ServerRack3D)
    const pieces = wrapper.findAll('.piece')
    expect(pieces).toHaveLength(21)
    // every shard has its own scatter destination
    for (const piece of pieces) {
      expect(piece.attributes('style')).toContain('--sx')
      expect(piece.attributes('style')).toContain('--ry')
    }
  })

  it('shatters on hover and reassembles on leave', async () => {
    const wrapper = mount(ServerRack3D)
    const scene = wrapper.find('.scene')
    const rack = wrapper.find('.rack')

    expect(rack.classes()).not.toContain('shattered')

    await scene.trigger('pointerenter')
    expect(rack.classes()).toContain('shattered')

    await scene.trigger('pointerleave')
    expect(rack.classes()).not.toContain('shattered')
  })

  it('follows the cursor from anywhere on the page', async () => {
    const wrapper = mount(ServerRack3D, { attachTo: document.body })
    const rack = wrapper.find('.rack')
    const before = rack.attributes('style')

    window.dispatchEvent(
      new MouseEvent('pointermove', { clientX: window.innerWidth, clientY: 0 }),
    )
    await wrapper.vm.$nextTick()

    expect(rack.attributes('style')).not.toBe(before)
    wrapper.unmount()
  })
})
