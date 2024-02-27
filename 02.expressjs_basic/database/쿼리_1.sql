-- city 테이블에서 국가가 한국인 데이터만 추출하시오
SELECT
	*
FROM 
	city2
WHERE
	city2.CountryCode='KOR';
	
-- 도시들중에서 인수가 백만 이상(>=) 데이터만 추출
SELECT
	*
FROM 
	city2
WHERE
	city2.Population >= 1000000;

-- 도시들중에서 인수가 백만 이상(>=) 데이터만 추출, 
-- 내림차순 정렬
SELECT
	*
FROM 
	city2
WHERE
	city2.Population >= 1000000
ORDER BY Population DESC;

-- 도시들중에서 인수가 백만 이상(>=) 데이터만 추출, 
-- 내림차순 정렬
-- 상위 10개만 -> 제한
SELECT
	*
FROM 
	city2
WHERE
	city2.Population >= 1000000
ORDER BY Population DESC
LIMIT 10
;

-- 도시들중에서 인수가 백만 이상(>=) 데이터만 추출, 
-- 내림차순 정렬
-- 10개만 -> 제한
-- 11번째 ~ 20등까지만 출력 : LIMIT 시작위치, 시작위치로부터몇개
-- LIMIT (페이지번호-1)*페이지당데이터수, 페이지당보여질데이터개수
SELECT
	*
FROM 
	city2
WHERE
	city2.Population >= 1000000
ORDER BY Population DESC
LIMIT 10, 10
;

-- 
-- 
-- ID, 도시명, 인구수
SELECT ID, NAME, Population FROM city2
WHERE CountryCode='KOR'
ORDER BY Population DESC
LIMIT 5;

-- 국가코드 확인
-- 집계 기능을 이용해서 특정 칼럼의 중복 제거
SELECT CountryCode, COUNT(CountryCode) AS cnt
FROM city2
GROUP BY Countrycode
ORDER BY cnt;

-- 국가코드만 추출 (중복 제거, 집계후)
SELECT CountryCode AS code
FROM city2
GROUP BY Countrycode;

-- 특정칼럼 중복 제거
SELECT DISTINCT CountryCode AS code
FROM city2
order by Population DESC;

-- 특정 도시 정보 획득
SELECT * FROM city2 WHERE id=2890;

-- 특정 국가 정보 획득
SELECT * FROM country WHERE CODE='PER';

-- 2개 테이블에서 일치되는 정보를 기반으로
-- 새로운 데이터셋을 구축 => join 사용
-- 모든 도시에 대한 join
SELECT
	A.Name, A.CountryCode, B.SurfaceArea
FROM city2 AS A
JOIN country2 AS B
ON A.CountryCode=B.Code;

-- 1개의 도시 데이터에 country2를 join에서
-- 특정 국가의 일부 정보도 포함하여 조회
SELECT
	A.id, A.Name AS cityName, B.Code,
	A.CountryCode, B.Name, B.Region, B.surfaceArea
FROM (SELECT * FROM city2 WHERE id=2890) AS A
JOIN country2 AS B
ON A.CountryCode=B.Code;

-- 내용 업데이트
-- 여러개를 업데이트 할 경우 칼럼명=값, 칼럼명=값, ...
-- 조건식 부여 => 대상을 특정
UPDATE country2
SET SurfaceArea=9999
WHERE CODE='PER';comments