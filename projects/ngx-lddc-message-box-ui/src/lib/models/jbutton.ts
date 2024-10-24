export class JButton {
    label!: string;
    private panelClass?: string[]

    private constructor(_title: string, _panelClass?: string[]) {
        this.label = _title ?? '';
        this.panelClass = _panelClass ?? [];
    }
    static create(_title: string): JButton {
        return new JButton(_title);
    }
    static Ok = JButton.create('Ok');
    static Yes = JButton.create('Yes');
    static No = JButton.create('No');
    static Cancel = JButton.create('Cancel');
    static Retry = JButton.create('Retry');
}

export type InputDialog = {
    title?: string,
    message: string,
    buttons?: JButton[]
}

export type OpenDialog = {
    icon: DialogType
    input: InputDialog
}

export type DialogType = 'INFO' | 'QUESTION' | 'WARNING' | 'ERROR';