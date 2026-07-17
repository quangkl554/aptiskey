$ErrorActionPreference = 'Stop'

$sourceRoot = 'C:\Users\QUANG\OneDrive - VLG\Desktop\aptis'
$qaRoot = 'C:\Users\QUANG\.gemini\antigravity\scratch\aptis-study\.tmp\word_qa'

$documents = @(
    @{ File = 'Reading aptis part 1.docx'; Dir = 'reading_part1' },
    @{ File = 'Reading aptis part 2&3.docx'; Dir = 'reading_part2_3' },
    @{ File = 'Reading aptis part 4.docx'; Dir = 'reading_part4' },
    @{ File = 'Reading aptis part 5.docx'; Dir = 'reading_part5' },
    @{ File = 'Speaking aptis part 1.docx'; Dir = 'speaking_part1' },
    @{ File = 'Speaking aptis part 2.docx'; Dir = 'speaking_part2' },
    @{ File = 'Speaking aptis part 3.docx'; Dir = 'speaking_part3' },
    @{ File = 'Speaking aptis part 4.docx'; Dir = 'speaking_part4' }
)

$word = $null
$current = $null
try {
    $word = New-Object -ComObject Word.Application
    $word.Visible = $false
    $word.DisplayAlerts = 0

    foreach ($item in $documents) {
        $docxPath = Join-Path $sourceRoot $item.File
        if (-not (Test-Path -LiteralPath $docxPath)) {
            throw "Missing DOCX: $docxPath"
        }

        $outDir = Join-Path $qaRoot $item.Dir
        New-Item -ItemType Directory -Force -Path $outDir | Out-Null
        $pdfPath = Join-Path $outDir ([IO.Path]::GetFileNameWithoutExtension($item.File) + '.pdf')
        $current = $word.Documents.Open($docxPath, $false, $true)
        $current.ExportAsFixedFormat($pdfPath, 17)
        $current.Close(0)
        $current = $null

        [pscustomobject]@{
            Source = $docxPath
            Pdf = $pdfPath
            Bytes = (Get-Item -LiteralPath $pdfPath).Length
        }
    }
}
finally {
    if ($null -ne $current) {
        $current.Close(0)
    }
    if ($null -ne $word) {
        $word.Quit()
        [void][Runtime.InteropServices.Marshal]::ReleaseComObject($word)
    }
    [GC]::Collect()
    [GC]::WaitForPendingFinalizers()
}
