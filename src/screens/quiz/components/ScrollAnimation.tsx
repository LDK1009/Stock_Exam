import { mixinFlex } from '@/styles/mixins'
import { theme } from '@/styles/theme'
import styled from '@emotion/native'
import { MotiView } from 'moti'
import React, { useState } from 'react'

const ScrollAnimation = () => {
  const [animationEnd, setAnimationEnd] = useState(false)
  const [animationCount, setAnimationCount] = useState(1)

  // 애니메이션 variants 정의
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  }

  const ballVariants = {
    hidden: { opacity: 0, translateY: -20 },
    visible: { opacity: 1, translateY: 20 },
  }

  const transition = {
    type: 'spring' as const,
    damping: 20,
  }

  function handleAnimationCount() {
    // 3번 애니메이션 실행 후 종료
    if (animationCount < 2) {
      setTimeout(() => {
        setAnimationCount(animationCount + 1)
      }, 1000)
    }

    if (animationCount === 2) {
      setTimeout(() => {
        setAnimationEnd(true)
      }, 1000)
    }
  }

  return (
    <>
      {!animationEnd && (
        <Container>
          <BallContainer
            key={animationCount}
            from={containerVariants.hidden}
            animate={containerVariants.visible}
            transition={transition}
          >
            <Ball
              key={animationCount}
              from={ballVariants.hidden}
              animate={ballVariants.visible}
              transition={transition}
              onDidAnimate={() => {
                handleAnimationCount()
              }}
            />
          </BallContainer>
        </Container>
      )}
    </>
  )
}

export default ScrollAnimation

const Container = styled(MotiView)`
  width: 100%;
  height: auto;

  ${mixinFlex('column', 'center', 'center')}

  position: absolute;
  bottom: 80px;
  background-color: red;
  z-index: ${theme.zIndices.modal + 1};
  pointer-events: none; /* 터치 이벤트 차단 방지 */
`

const BallContainer = styled(MotiView)`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: auto;
  max-width: 24px;
  height: 50px;
  padding: 4px;

  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.7);
`

const Ball = styled(MotiView)`
  height: 16px;
  width: 16px;
  border-radius: 100%;
  background-color: rgba(255, 255, 255, 0.7);
`
