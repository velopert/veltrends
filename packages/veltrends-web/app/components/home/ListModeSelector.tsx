import { Link } from '@remix-run/react'
import { motion } from 'framer-motion'
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import styled, { css } from 'styled-components'
import { type ListMode } from '~/lib/api/types'
import { colors } from '~/lib/colors'
import { Calendar, Time, Trending } from '../vectors'

interface Props {
  mode: ListMode
  onSelectMode(mode: ListMode): void
}

function ListModeSelector({ mode, onSelectMode }: Props) {
  const [elementSizes, setElementSizes] = useState([0, 0, 0])
  const setElementSizeOfIndex = useCallback((index: number, size: number) => {
    setElementSizes((prev) => {
      const next = [...prev]
      next[index] = size
      return next
    })
  }, [])

  const modeProps = useMemo(
    () =>
      [
        {
          mode: 'trending',
          icon: <Trending />,
          name: '트렌딩',
        },
        {
          mode: 'recent',
          icon: <Time />,
          name: '최신',
        },
        {
          mode: 'past',
          icon: <Calendar />,
          name: '과거',
        },
      ] as const,
    [],
  )

  const currentIndex = useMemo(
    () => modeProps.findIndex((p) => p.mode === mode),
    [modeProps, mode],
  )
  const indicatorWidth = elementSizes[currentIndex]
  const indicatorLeft = useMemo(() => {
    const gaps = currentIndex * 16
    const sizes = elementSizes.slice(0, currentIndex).reduce((a, b) => a + b, 0)
    return gaps + sizes
  }, [currentIndex, elementSizes])

  /** @todo: implement with link instead of onClick */

  return (
    <Block>
      {modeProps.map((props, index) => (
        <ListModeItem
          currentMode={mode}
          onSelectMode={onSelectMode}
          key={props.name}
          index={index}
          onUpdateSize={setElementSizeOfIndex}
          {...props}
        />
      ))}
      {indicatorWidth === 0 ? null : (
        <Indicator
          layout
          style={{
            left: indicatorLeft,
            width: indicatorWidth,
          }}
        />
      )}
    </Block>
  )
}

const useIsomorphicEffect =
  typeof window === 'undefined' ? useLayoutEffect : useLayoutEffect

function ListModeItem({
  currentMode,
  mode,
  onSelectMode,
  icon,
  name,
  onUpdateSize,
  index,
}: Props & {
  currentMode: ListMode
  icon: React.ReactNode
  name: string
  index: number
  onUpdateSize(index: number, size: number): void
}) {
  const ref = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (!ref.current) return
    onUpdateSize(index, ref.current.clientWidth)
  }, [onUpdateSize, index])

  return (
    <Mode
      isActive={mode === currentMode}
      onClick={() => onSelectMode(mode)}
      ref={ref}
      to={`/?mode=${mode}`}
      prefetch={mode === 'past' ? undefined : 'intent'}
    >
      {icon}
      {name}
    </Mode>
  )
}

const Block = styled.div`
  display: flex;
  margin-bottom: 24px;
  gap: 16px;
  position: relative;
`

const Mode = styled(Link)<{ isActive?: boolean }>`
  cursor: pointer;
  display: flex;
  align-items: center;
  color: ${colors.gray3};
  text-decoration: none;
  svg {
    width: 24px;
    height: 24px;
    margin-right: 8px;
  }
  line-height: 1.5;
  font-size: 16px;

  ${(props) =>
    props.isActive &&
    css`
      color: ${colors.primary};
      font-weight: 600;
    `}
`

const Indicator = styled(motion.div)`
  height: 2px;
  background: ${colors.primary};
  position: absolute;
  left: 0;
  bottom: -8px;
  border-radius: 1px;
`

export default ListModeSelector
