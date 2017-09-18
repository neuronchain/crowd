<script type="text/template" id="project-template">
    <td>{{= id }}</td>
    <td>{{if (!name) { }} 
        Без названия
        {{ } else { }}
        {{= name }}
        {{ } }}
    </td>
    <td><button class="btn btn-success edit-project"><i class="fa fa-pencil"></i></button></td>
    <td><button class="btn btn-danger delete-project"><i class="fa fa-times"></i></button></td>
</script>