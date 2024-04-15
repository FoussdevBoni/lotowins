export function combinaisons(n, k) {
    if (k === 0 || k === n) {
        return 1;
    } else {
        return combinaisons(n - 1, k - 1) + combinaisons(n - 1, k);
    }
}
