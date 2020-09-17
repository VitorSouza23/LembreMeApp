interface IIconButton {
    iconName: string;
    title: string;
    onClick(event?: Event): void; 
}

export default IIconButton;