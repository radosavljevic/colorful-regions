const isHexColor = (s: string) => {
    const isHexColor  = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;    
    return isHexColor.test(s);
};

export { isHexColor };