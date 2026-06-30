$path = 'c:\Users\ACER\Downloads\undangan-4.x\index.html'
$content = [System.IO.File]::ReadAllText($path)

$bismillah = '&#1576;&#1616;&#1587;&#1618;&#1605;&#1616; &#1575;&#1604;&#1604;&#1617;&#1648;&#1607;&#1616; &#1575;&#1604;&#1585;&#1617;&#1614;&#1581;&#1618;&#1605;&#1648;&#1606;&#1616; &#1575;&#1604;&#1585;&#1617;&#1614;&#1581;&#1616;&#1610;&#1618;&#1605;&#1616;'
$alhamdulillah = '&#1575;&#1614;&#1604;&#1618;&#1581;&#1614;&#1605;&#1618;&#1583;&#1615; &#1604;&#1616;&#1604;&#1617;&#1648;&#1607;&#1616; &#1585;&#1614;&#1576;&#1616;&#1617; &#1575;&#1604;&#1618;&#1593;&#1648;&#1604;&#1614;&#1605;&#1616;&#1610;&#1618;&#1606;&#1614;'

$content = [regex]::Replace($content, '(?s)<h2 class="font-arabic py-4 m-0"[^>]*>.*?</h2>', ('<h2 class="font-arabic py-4 m-0" style="font-size: 2rem;">' + $bismillah + '</h2>'))
$content = [regex]::Replace($content, '(?s)<h2 class="font-arabic pt-4"[^>]*>.*?</h2>', ('<h2 class="font-arabic pt-4" style="font-size: 2rem;">' + $alhamdulillah + '</h2>'))

[System.IO.File]::WriteAllText($path, $content)
Write-Host 'Arabic text fixed'
