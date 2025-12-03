import { createSlice } from "@reduxjs/toolkit";



const initialState: { name?: string, isPortalOpen: boolean } = {
  isPortalOpen: false

}
const portalModalSlice = createSlice({
  name: "portal-modal-handler",
  initialState: initialState,
  reducers: {

    setPortalModalOpen(state) {
      state.isPortalOpen = true
    },
    setPortalModalClose(state) {
      state.isPortalOpen = false
    },
    setPortalModalToggle(state) {
      const isPortal = state.isPortalOpen
      if (isPortal) state.isPortalOpen = false
      else state.isPortalOpen = true
    }




  }
})


export const { setPortalModalOpen, setPortalModalClose, setPortalModalToggle } = portalModalSlice.actions
export default portalModalSlice.reducer

