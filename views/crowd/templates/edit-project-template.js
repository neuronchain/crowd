<script type="text/template" id="edit-project-template">
    <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item">
            <a class="nav-link active" id="creation-tab" data-toggle="tab" href="#creation" role="tab" aria-controls="creation" aria-expanded="true">Создание проекта</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" id="presentation-tab" data-toggle="tab" href="#presentation" role="tab" aria-controls="presentation">Презентация проекта</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" id="stages-tab" data-toggle="tab" href="#stages" role="tab" aria-controls="stages">Этапы сбора инвестиций</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" id="news-tab" data-toggle="tab" href="#news" role="tab" aria-controls="news">Новости</a>
        </li>
    </ul>
    <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="creation" role="tabpanel" aria-labelledby="creation-tab">
            <form>
                <div class="form-group">
                    <label for="name-input">Наименование проекта</label>
                    <input type="text" class="form-control" id="name-input" placeholder="Введите наименование проекта" value="{{= name }}">
                </div>
                <div class="form-group">
                    <label for="description-input">Краткое описание проекта</label>
                    <textarea class="form-control" id="description-input" rows="3">{{= description }}</textarea>
                </div>
            </form>
            <form>
                <div class="form-row align-items-center">
                    <div class="col-sm-3">
                        <label class="sr-only" for="country-input">Страна</label>
                        <input type="text" class="form-control mb-2 mb-sm-0" id="country-input" placeholder="Введите страну" disabled value="Россия">
                    </div>
                    <div class="col-sm-3">
                        <label class="sr-only" for="region-input">Регион</label>
                        <input type="text" class="form-control mb-2 mb-sm-0" id="region-input" placeholder="Введите регион" value="{{ if (typeof locality != 'undefined') { }} {{= locality.region.name }} {{ } }}">
                    </div>
                    <div class="col-sm-3">
                        <label class="sr-only" for="locality-input">Город</label>
                        <input type="text" class="form-control mb-2 mb-sm-0" id="locality-input" placeholder="Введите город" value="{{ if (typeof locality != 'undefined') { }} {{= locality.name }} {{ } }}">
                    </div>
                </div>
            </form>
            <form>
                <div class="form-group">
                    <label for="website-input">Сайт проекта</label>
                    <input type="text" class="form-control" id="website-input" placeholder="Введите сайт проекта" value="{{= website }}">
                </div>
            </form>
            <button type="button" class="btn btn-success" id="save-creation">Сохранить</button>
        </div>
        <div class="tab-pane fade" id="presentation" role="tabpanel" aria-labelledby="presentation-tab">...</div>
        <div class="tab-pane fade" id="stages" role="tabpanel" aria-labelledby="stages-tab">
             <form>
                <div class="form-group">
                    <label for="lotCount-input">Количество токенов</label>
                    <input type="text" class="form-control" id="lotCount-input" placeholder="Введите количество токенов"
                        {{ if (rounds.length > 0) { }}
                            value="{{= rounds[0].lotCount }}"
                        {{ } }}
                    >
                </div>
                <div class="form-group">
                    <label for="lotNotional-input">Стоимость токена</label>
                    <input type="text" class="form-control" id="lotNotional-input" placeholder="Введите стоимость токена"
                        {{ if (rounds.length > 0) { }}
                            value="{{= rounds[0].lotNotional }}"
                        {{ } }}
                    >
                </div>
                <div class="form-group">
                    <label for="symbol-input">Символ</label>
                    <input type="text" class="form-control" id="symbol-input" placeholder="Введите символ токена"
                        {{ if (rounds.length > 0) { }}
                            value="{{= rounds[0].symbol }}"
                        {{ } }}
                    >
                </div>
                <div class="form-group">
                    <label for="tokeName-input">Название токена</label>
                    <input type="text" class="form-control" id="tokenName-input" placeholder="Введите название токена"
                        {{ if (rounds.length > 0) { }}
                            value="{{= rounds[0].tokenName }}"
                        {{ } }}
                    >
                </div>
                <div class="form-group">
                    <label for="decimals-input">Decimals</label>
                    <input type="text" class="form-control" id="decimals-input" placeholder="Введите decimals токена"
                        {{ if (rounds.length > 0) { }}
                            value="{{= rounds[0].decimals }}"
                        {{ } }}
                    >
                </div>
            </form>
            <button type="button" class="btn btn-success" id="save-stages">Сохранить</button>
        </div>
        <div class="tab-pane fade" id="news" role="tabpanel" aria-labelledby="news-tab">...</div>
    </div>
    <button type="btn" class="btn btn-primary" style="margin-top: 25px;" id="deploy">Деплой</button>
</script>