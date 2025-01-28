import styled from '@emotion/styled'

export const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-width: 100vw;
  min-height: 100vh;
  height: 100%;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const LoaderBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-width: 100vw;
  min-height: 100vh;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1001;
  display: flex;
  justify-content: center;
  align-items: center;
`
