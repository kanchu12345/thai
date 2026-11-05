$ErrorActionPreference = 'Stop'

# File extensions to process
$extensions = @('*.html','*.htm','*.css','*.js','*.ts','*.jsx','*.tsx','*.json','*.md','*.php','*.vue')

# Emoji regex pattern covering most emoji Unicode blocks
$emojiPattern = '[\x{2600}-\x{27BF}\x{1F300}-\x{1F5FF}\x{1F600}-\x{1F64F}\x{1F680}-\x{1F6FF}\x{1F700}-\x{1F77F}\x{1F780}-\x{1F7FF}\x{1F800}-\x{1F8FF}\x{1F900}-\x{1F9FF}\x{1FA00}-\x{1FA6F}\x{1FA70}-\x{1FAFF}]'
# Matches a tag whose only content is emojis (plus optional whitespace/variation selectors/zero‑width joiners)
$wrapperPattern = '<(?<tag>\w+)[^>]*>\s*(?:' + $emojiPattern + '|[\s\x{FE0F}\x{200D}])*\s*</\k<tag>>'
# Matches empty tags after removal
$emptyTagPattern = '<(?<tag>\w+)[^>]*>\s*</\k<tag>>'

$changedFiles = @()

Get-ChildItem -Recurse -File -Include $extensions | ForEach-Object {
    $filePath = $_.FullName
    $content = Get-Content $filePath -Raw
    $original = $content

    # Remove wrapper tags that contain only emojis
    $content = [regex]::Replace($content, $wrapperPattern, '', [System.Text.RegularExpressions.RegexOptions]::IgnoreCase -bor [System.Text.RegularExpressions.RegexOptions]::Singleline)
    # Remove any now‑empty tags
    $content = [regex]::Replace($content, $emptyTagPattern, '', [System.Text.RegularExpressions.RegexOptions]::IgnoreCase -bor [System.Text.RegularExpressions.RegexOptions]::Singleline)
    # Remove stray emoji characters anywhere else
    $content = [regex]::Replace($content, $emojiPattern, '', [System.Text.RegularExpressions.RegexOptions]::Singleline)

    if ($content -ne $original) {
        Set-Content -Path $filePath -Value $content -Encoding UTF8
        $changedFiles += $filePath
    }
}

# Report changed files
Write-Output "Changed files:"
$changedFiles | ForEach-Object { Write-Output $_ }

# Verify no emojis remain
$remaining = Get-ChildItem -Recurse -File -Include $extensions | Where-Object { (Get-Content $_.FullName -Raw) -match $emojiPattern }
if ($remaining) {
    Write-Output "Emoji still present in the following files:"
    $remaining.FullName
} else {
    Write-Output "No emoji characters remain in the codebase."
}
