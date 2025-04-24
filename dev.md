## 버전

- 사용 라이브러리, 프레임워크의 버전 미리 확인

## API

- KMDb - 한국영상자료원: 신청

- 영화진흥위원회 오픈 API: 사용중

<br />

## 믹스인 활용

- 반응형, 시스템 화면 모드에 대한 믹스인 생성 및 사용

```scss
@mixin respond-to($breakpoint) {
  @if $breakpoint == small {
    @media (max-width: 599px) {
      @content;
    }
  } @else if $breakpoint == medium {
    @media (min-width: 600px) and (max-width: 1199px) {
      @content;
    }
  } @else if $breakpoint == large {
    @media (min-width: 1200px) {
      @content;
    }
  } @else {
    @media #{$breakpoint} {
      @content;
    }
  }
}

.container {
  width: 90%;
  margin: 0 auto;

  @include respond-to(medium) {
    width: 70%;
  }

  @include respond-to(large) {
    width: 1200px;
  }
}
```

<br />

## database

- docker 주의

<br />

## 환경변수

- 데이터베이스

- 외부 API

<br />

## 설치 패키지

- zod, scss, zustand
