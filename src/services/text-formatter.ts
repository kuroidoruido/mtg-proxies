export function preformat(text: string): string {
    return text
        .replaceAll("{(tap)}", '<span class="tap-cost">↷</span>')
        .replaceAll(/(\{\((\d+)\)\})/g, '<span class="mana-cost">$2</span>');
}
