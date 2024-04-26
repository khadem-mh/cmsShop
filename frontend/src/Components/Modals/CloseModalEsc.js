const CloseModalEsc = (fun) => {
    const checkKey = e => e.keyCode === 27 && fun()
    window.addEventListener('keydown', checkKey)
    return () => window.removeEventListener('keydown', checkKey)
}

export default CloseModalEsc