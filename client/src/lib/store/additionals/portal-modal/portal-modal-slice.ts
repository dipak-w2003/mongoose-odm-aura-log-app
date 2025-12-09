import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


export type ModalContentUnion = "main-todo-update" | "todo-a-subtask-update"
const initialState: { modalContent: ModalContentUnion | null, isPortalOpen: boolean } = {
  isPortalOpen: false,
  modalContent: "main-todo-update"
}
const portalModalSlice = createSlice({
  name: "portal-modal-handler",
  initialState: initialState,
  reducers: {
    setPortalModalContent(state, action: PayloadAction<ModalContentUnion>) {
      state.modalContent = action.payload
    },
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


export const { setPortalModalOpen, setPortalModalClose, setPortalModalToggle, setPortalModalContent } = portalModalSlice.actions
export default portalModalSlice.reducer

